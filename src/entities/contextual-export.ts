import { ContextualHelp } from './contextual-help';

export class ContextualExport {
  constructor(public pluginId: string | null, public contextualHelp: ContextualHelp | null) {
  }
}
