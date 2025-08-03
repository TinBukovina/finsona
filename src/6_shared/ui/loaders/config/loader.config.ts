// Definition of props that loaders will have
export interface LoaderProps {
  bg?:
    | "primary"
    | "secondary"
    | "foreground"
    | "card_foreground"
    | "muted_foreground"
    | "border"
    | "input";
  text?:
    | "xs"
    | "sm"
    | "md"
    | "normal"
    | "h6"
    | "h5"
    | "h4"
    | "h3"
    | "h2"
    | "h1";
  width?: string;
  height?: string;
  className?: string;
  border?: boolean;
}

// Centralize object for background colors
export const backgroundColors = {
  primary: "bg-primary/50",
  secondary: "bg-secondary/50",
  foreground: "bg-foreground/50",
  card_foreground: "bg-card-foreground/50",
  muted_foreground: "bg-muted-foreground/50",
  border: "bg-border/50",
  input: "bg-input/50",
};

// Centralize object for font size
export const fontSizes = {
  xs: "text-xs",
  sm: "text-sm",
  md: "text-md",
  normal: "text-normal",
  h6: "text-h6",
  h5: "text-h5",
  h4: "text-h4",
  h3: "text-h3",
  h2: "text-h2",
  h1: "text-h1",
};
