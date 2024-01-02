import { OpenedFile } from "../dtos/OpenedFile";
import { PluginFile } from "../dtos/PluginFile";

export class DemoPlugin implements PluginFile {
  parse(file: OpenedFile): { result: string } {
    return {
      result: `###\n${file.text}`,
    };
  }
}
