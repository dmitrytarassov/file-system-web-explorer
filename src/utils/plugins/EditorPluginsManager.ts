import { IPlugin } from "../../dtos/IPlugin";
import { Typed } from "../../dtos/common";
import { Editor } from "../Editor";

export class EditorPluginsManager {
  constructor(private readonly editor: Editor) {}

  addPlugin(register: Typed<void, [EditorPluginsManager]>) {
    register(this);
  }

  update(plugin: IPlugin) {
    this.editor.update([plugin]);
  }
}
