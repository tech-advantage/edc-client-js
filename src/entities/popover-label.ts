import { Loadable } from './loadable';
import { PopoverError } from './popover-error';

export class PopoverLabel implements Loadable {
  exportId: string | null = '';
  url: string | null = '';
  content?: string | null;
  articles?: string | null;
  links?: string | null;
  iconAlt?: string | null;
  comingSoon?: string | null;
  errorTitle?: string | null;
  errors: PopoverError | null = null;
}
