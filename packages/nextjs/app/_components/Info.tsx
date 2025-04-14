interface InfoProps {
  dataTip: string;
}

export const Info = ({ dataTip }: InfoProps) => {
  return (
    <div className="tooltip tooltip-accent tooltip-top pb-4" data-tip={dataTip}>
      <button className="btn btn-info">{"Info"}</button>
    </div>
  );
};
