interface IconTemplateProps {
  width?: string;
  height?: string;
  fill?: string;
  viewBox: string;
  path: string;
}

const IconTemplate: React.FC<IconTemplateProps> = ({
  width = "100%",
  height = "100%",
  fill = "inherit",
  viewBox,
  path,
}) => {
  return (
    <svg
      width={width}
      height={height}
      fill={fill}
      viewBox={viewBox}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={path} fill={fill} />
    </svg>
  );
};

export default IconTemplate;
