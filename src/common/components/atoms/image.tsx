/* eslint-disable react/require-default-props */
import { DetailedHTMLProps, FC, ImgHTMLAttributes } from "react";

interface Iimage
  extends DetailedHTMLProps<
    ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  > {
  webpSrc: string;
  alt: string;
  src: string;
}

const Image: FC<Iimage> = ({ src, webpSrc, alt, ...props }) => (
  <picture>
    <source srcSet={webpSrc} type="image/webp" />
    <img src={src} alt={alt} {...props} />
  </picture>
);

export default Image;
