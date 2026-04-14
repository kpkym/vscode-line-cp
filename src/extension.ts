import * as vscode from "vscode";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  const disposable = vscode.commands.registerCommand(
    "lineCopy.copyLineReference",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        return;
      }

      const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;
      const fileName = workspaceFolder
        ? path.relative(workspaceFolder, editor.document.fileName)
        : path.basename(editor.document.fileName);
      const selection = editor.selection;

      let lineRef: string;
      if (selection.isEmpty) {
        lineRef = `@${fileName}`;
      } else {
        // VS Code lines are 0-based, display as 1-based
        const startLine = selection.start.line + 1;
        const endLine = selection.end.line + 1;
        lineRef =
          startLine === endLine
            ? `@${fileName}#${startLine}`
            : `@${fileName}#${startLine}-${endLine}`;
      }

      await vscode.env.clipboard.writeText(lineRef);
      vscode.window.setStatusBarMessage(`Copied: ${lineRef}`, 2000);
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
