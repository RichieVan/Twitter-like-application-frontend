export interface ImageClipperProps {
  link: string;
  fileUrlHandler: (fileUrl: string | null) => void;
}

export type BordersObject = {
  left: number;
  right: number;
  top: number;
  bottom: number;
};

export interface MoveAtProps {
  x: number;
  y: number;
  width: number;
  height: number;
  borders?: BordersObject;
}
