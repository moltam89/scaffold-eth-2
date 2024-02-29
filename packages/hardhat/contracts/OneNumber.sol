//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract OneNumber {
    struct NumberData {
        address player;
        uint96 count;
    }

    struct Game {
        uint72 cost;
        uint32 blindDuration;
        uint32 revealDuration;
        uint32 start;
        uint88 prize;
        mapping(address => bytes32) blindedNumbersMap;
        mapping(uint => NumberData) revealedNumbersData;
        uint[] revealedNumbers;
        mapping(address => uint) revealedNumbersMap;
        address winningAddress;
        uint winningNumber;
    }

    uint public numGames;
    mapping(uint => Game) public games;

    event GameCreated(uint gameId);
    event BlindedNumber(uint indexed gameId, address player);
    event RevealNumber(uint indexed gameId, address player, uint indexed number);
    event Winner(uint indexed gameId, address winner, uint number);
    event ClaimedWinner(uint indexed gameId, address winner, uint number);

    error InvalidCost();
    error InvalidGame();
    error BlindedNumberTooLate();
    error OnlyOneNumber();
    error RevealTooEarly();
    error RevealTooLate();
    error RevealIncorrect();
    error BlindedNumberMissing();
    error EndGameTooEarly();
    error ClaimEndGameTooEarly();
    error ClaimWinnerTooEarly();
    error GameEnded();
    error NoPlayers();
    error NoZero();
    error AlreadyRevealed();
    error NotTheWinner();
    error WinnerNotClaimed();

    function newGame(uint72 cost, uint32 blindDuration, uint32 revealDuration) external returns (uint gameId) {
        gameId = numGames++;

        Game storage game = games[gameId];

        game.cost = cost;
        game.blindDuration = blindDuration;
        game.revealDuration = revealDuration;
        game.start = uint32(block.timestamp);

        emit GameCreated(gameId);
        
        return gameId;
    }

    function setBlindedNumber(uint gameId, bytes32 blindedNumber) external payable {
        Game storage game = games[gameId];

        if (game.start == 0) {
            revert InvalidGame();
        }

        if (msg.value != game.cost) {
            revert InvalidCost();
        }

        if (block.timestamp > game.start + game.blindDuration) {
            revert BlindedNumberTooLate();
        }

        if (game.blindedNumbersMap[msg.sender] != 0) {
            revert OnlyOneNumber();
        }

        game.blindedNumbersMap[msg.sender] = blindedNumber;

        game.prize += uint88(msg.value);

        emit BlindedNumber(gameId, msg.sender);
    }

    function revealNumber(uint gameId, uint number, bytes32 secret) external {
        _revealNumber(gameId, number, keccak256(abi.encodePacked(number, secret)));
    }

    function revealNumber(uint gameId, uint number, string memory secret) external {
        _revealNumber(gameId, number, keccak256(abi.encodePacked(number, secret)));
    }

    function _revealNumber(uint gameId, uint number, bytes32 blindedNumber) private {
        Game storage game = games[gameId];

        if (block.timestamp <= game.start + game.blindDuration) {
            revert RevealTooEarly();
        }

        if (block.timestamp > game.start + game.blindDuration + game.revealDuration) {
            revert RevealTooLate();
        }

        if (number == 0) {
            revert NoZero();
        }

        bytes32 storedBlindedNumber = game.blindedNumbersMap[msg.sender];

        if (storedBlindedNumber == 0) {
            revert BlindedNumberMissing();
        }

        if (storedBlindedNumber != blindedNumber) {
            revert RevealIncorrect();
        }

        if (game.revealedNumbersMap[msg.sender] != 0) {
            revert AlreadyRevealed();
        }

        game.revealedNumbersMap[msg.sender] = number;

        NumberData storage numberData = game.revealedNumbersData[number];

        if (numberData.player == address(0)) {
            numberData.player = msg.sender;

            game.revealedNumbers.push(number);
        }

        numberData.count++;

        emit RevealNumber(gameId, msg.sender, number);
    }

    function endGame(uint gameId) external {
        Game storage game = games[gameId];

        if (block.timestamp <= game.start + game.blindDuration + game.revealDuration) {
            revert EndGameTooEarly();
        }

        uint[] memory revealedNumbers = game.revealedNumbers;

        if (revealedNumbers.length == 0) {
            revert NoPlayers();
        }

        if (game.prize == 0) {
            revert GameEnded();
        }

        uint lowestUniqueNumber;
        uint lowestUniqueNumberCount;

        address winner;

        for (uint i = 0; i < revealedNumbers.length; i++) {
            uint number = revealedNumbers[i];

            NumberData memory numberData = game.revealedNumbersData[number];

            uint96 count = numberData.count;

            if ((lowestUniqueNumberCount != 0) && (count > lowestUniqueNumberCount)) {
                continue;
            }
            if (count == lowestUniqueNumberCount) {
                if (number > lowestUniqueNumber) {
                    continue;
                }
            }

            lowestUniqueNumber = number;
            lowestUniqueNumberCount = count;

            winner = numberData.player;
        }

        uint prize = game.prize;

        game.prize = 0;

        payable(winner).transfer(prize);

        emit Winner(gameId, winner, lowestUniqueNumber);
    }

    function claimWinningNumber(uint gameId, address winner, uint number) external {
        Game storage game = games[gameId];

        if (block.timestamp <= game.start + game.blindDuration + game.revealDuration) {
            revert ClaimWinnerTooEarly();
        }

        uint[] memory revealedNumbers = game.revealedNumbers;

        if (revealedNumbers.length == 0) {
            revert NoPlayers();
        }

        if (game.prize == 0) {
            revert GameEnded();
        }

        NumberData memory numberData = game.revealedNumbersData[number];

        if (numberData.player != winner) {
            revert NotTheWinner();
        }

        if (numberData.count != 1) {
            revert NotTheWinner();
        }

        if ((number > game.winningNumber) && (game.winningNumber != 0)) {
            revert NotTheWinner();
        }

        game.winningAddress = winner;
        game.winningNumber = number;

        emit ClaimedWinner(gameId, winner, number);
    }

    function claimEndGame(uint gameId) external {
        Game storage game = games[gameId];

        if (block.timestamp <= game.start + 2 * (game.blindDuration + game.revealDuration)) {
            revert ClaimEndGameTooEarly();
        }

        uint[] memory revealedNumbers = game.revealedNumbers;

        if (revealedNumbers.length == 0) {
            revert NoPlayers();
        }

        if (game.prize == 0) {
            revert GameEnded();
        }

        if (game.winningNumber == 0) {
            revert WinnerNotClaimed();
        }

        uint prize = game.prize;

        game.prize = 0;

        payable(game.winningAddress).transfer(prize);

        emit Winner(gameId, game.winningAddress, game.winningNumber);
    }
}