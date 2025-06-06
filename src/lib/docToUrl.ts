type Props = {
  _type: string;
  slug?: string;
};

export default function docToUrl({ _type, slug }: Props) {
  if (_type === "homepage") {
    return "/";
  }
  if (_type === "page") {
    return `/${slug}`;
  }
  if (_type === "category") {
    return `/category/${slug}`;
  }
  if (_type === "project") {
    return `/work/${slug}`;
  }
  if (_type === "collection") {
    return `/collection/${slug}`;
  }
  return "#";
}
