import { UseToastOptions, ToastId } from '@chakra-ui/react';

import { createStandaloneToast } from '@chakra-ui/toast';

import { theme } from '@lib/theme';

const defaults = {
  duration: 5000,
  position: 'top',
} as const;

const { ToastContainer, toast } = createStandaloneToast({ defaultOptions: defaults, theme });

export const MessageContainer = ToastContainer;

const parseOptions = (options) => {
  if (typeof options === 'string') {
    return {
      description: options,
    };
  }
  return options;
};

export type MessageOptions = UseToastOptions | string;

export const message = (options: MessageOptions) => {
  const opts = parseOptions(options);
  return toast({
    ...opts,
  });
};

message.info = (options: MessageOptions) => message({ status: 'info', ...parseOptions(options) });

message.success = (options: MessageOptions) =>
  message({ status: 'success', ...parseOptions(options) });

message.error = (options: MessageOptions) => message({ status: 'error', ...parseOptions(options) });

message.warning = (options: MessageOptions) =>
  message({ status: 'warning', ...parseOptions(options) });

message.update = (toastId: ToastId, options: UseToastOptions) => {
  const opts = parseOptions(options);
  return toast.update(toastId, {
    ...opts,
  });
};
message.isActive = toast.isActive;
message.close = toast.close;
message.closeAll = toast.closeAll;
