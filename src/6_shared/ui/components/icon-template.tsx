interface IconTemplateProps {
  width?: string;
  height?: string;
  fill?: string;
  svg: {
    path: string;
    viewBox: string;
  };
}

const IconTemplate: React.FC<IconTemplateProps> = ({
  width = "100%",
  height = "100%",
  fill = "inherit",
  svg,
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox={svg.viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={svg.path} fill={fill} />
    </svg>
  );
};

export default IconTemplate;
