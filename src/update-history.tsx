import { Clipboard } from "@project-gauntlet/api/helpers";
const hist: string[] = [];

export default async function UpdateHistory(): Promise<string[]> {
  const clipText = await Clipboard.readText();
  if (clipText && !hist.includes(clipText)) {
    hist.push(clipText);
    console.log(clipText);
  }
  return hist;
}
