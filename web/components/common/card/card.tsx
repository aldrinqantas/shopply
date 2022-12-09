import * as React from 'react';
import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  ThemingProps,
  omitThemingProps,
  SystemProps,
  SystemStyleObject,
  ThemeTypings,
  useMultiStyleConfig,
  createStylesContext,
} from '@chakra-ui/system';
import { ButtonGroup, ButtonGroupProps } from '@chakra-ui/react';

import { __DEV__ } from '@chakra-ui/utils';

const [StylesProvider, useStyles] = createStylesContext('Card');

type Variants = 'plain' | 'outline' | 'solid';

interface CardOptions {
  /**
   * Show hover styles when the mouse hovers the card.
   */
  isHoverable?: boolean;
  /**
   * This will render the `CardHeader` with the title.
   * @type React.ReactNode
   */
  title?: React.ReactNode;
  /**
   * This will render the `CardHeader` with the sub title.
   * @type React.ReactNode
   */
  subtitle?: React.ReactNode;
  /**
   * The header action
   * @type React.ReactNode
   */
  action?: React.ReactNode;
  /**
   * The card avatar
   * @type React.ReactNode
   */
  avatar?: React.ReactNode;
  /**
   * The card footer actions, will be wrapped in a `ButtonGroup`
   * @type React.ReactNode
   */
  actions?: React.ReactNode;
  /**
   * @type "plain" | "outline" | "solid"
   * @default "plain"
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  variant?: 'Card' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Card']['variants']
    : Variants;
}

export interface CardProps
  extends CardOptions,
    Omit<HTMLChakraProps<'div'>, 'title'>,
    Omit<ThemingProps<'Card'>, 'variant'> {}

export const Card = forwardRef<CardProps, 'div'>((props, ref) => {
  const { title, subtitle, action, avatar, actions, children, ...rest } = props;

  const showHeader = title || subtitle || action || avatar;

  return (
    <CardContainer ref={ref} {...rest}>
      {showHeader && (
        <CardHeader title={title} subtitle={subtitle} action={action} avatar={avatar} />
      )}
      {children}
      {actions && <CardFooter>{actions}</CardFooter>}
    </CardContainer>
  );
});

if (__DEV__) {
  Card.displayName = 'Card';
}

export interface CardContainerProps
  extends HTMLChakraProps<'div'>,
    Omit<ThemingProps<'Card'>, 'variant'> {
  isHoverable?: boolean;
}

export const CardContainer = forwardRef<CardContainerProps, 'div'>((props, ref) => {
  const styles = useMultiStyleConfig('Card', props);

  const { children, isHoverable, ...rest } = omitThemingProps(props);

  return (
    <StylesProvider value={styles}>
      <chakra.div __css={styles.container} ref={ref} {...rest}>
        {children}
      </chakra.div>
    </StylesProvider>
  );
});

if (__DEV__) {
  CardContainer.displayName = 'CardContainer';
}

export interface CardHeaderProps extends Omit<HTMLChakraProps<'div'>, 'title'> {
  /**
   * The title
   * @type React.ReactNode
   */
  title?: React.ReactNode;
  /**
   * The sub title
   * @type React.ReactNode
   */
  subtitle?: React.ReactNode;
  /**
   * The header action
   * @type React.ReactNode
   */
  action?: React.ReactNode;
  /**
   * The card avatar
   * @type React.ReactNode
   */
  avatar?: React.ReactNode;
  /**
   * The spacing between the avatar and title
   * @type SystemProps["margin"]
   */
  spacing?: SystemProps['margin'];
}

export const CardHeader = forwardRef<CardHeaderProps, 'div'>((props, ref) => {
  const { title, subtitle, action, avatar, spacing = 4, children, ...rest } = props;
  const styles = useStyles();

  const innerStyle: SystemStyleObject = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  };

  let wrappedAvatar;
  if (avatar) {
    wrappedAvatar = (
      <chakra.div display="flex" flexShrink={0} justifyContent="stretch" marginEnd={spacing}>
        {avatar}
      </chakra.div>
    );
  }

  let wrappedTitle;
  if (title || subtitle) {
    wrappedTitle = (
      <chakra.div display="flex" flexDirection="column" flex="1">
        {typeof title === 'string' ? <CardTitle>{title}</CardTitle> : title}
        {typeof subtitle === 'string' ? <CardSubtitle>{subtitle}</CardSubtitle> : subtitle}
      </chakra.div>
    );
  }

  let wrappedAction;
  if (action) {
    wrappedAction = (
      <ButtonGroup variant="ghost" marginStart={spacing} alignSelf="start">
        {action}
      </ButtonGroup>
    );
  }

  return (
    <chakra.div __css={styles.header} ref={ref} {...rest}>
      <chakra.div __css={innerStyle}>
        {wrappedAvatar} {wrappedTitle} {children} {wrappedAction}
      </chakra.div>
    </chakra.div>
  );
});

if (__DEV__) {
  CardHeader.displayName = 'CardHeader';
}

export type CardHeaderActionProps = HTMLChakraProps<'div'>;

export const CardHeaderAction = forwardRef<CardHeaderActionProps, 'div'>(
  ({ children, ...rest }, ref) => {
    const styles = useStyles();
    return (
      <chakra.div __css={styles.headerAction} ref={ref} {...rest}>
        {children}
      </chakra.div>
    );
  },
);

if (__DEV__) {
  CardHeaderAction.displayName = 'CardHeaderAction';
}

export type CardTitleProps = HTMLChakraProps<'h2'>;

export const CardTitle = forwardRef<CardTitleProps, 'h2'>(({ children, ...rest }, ref) => {
  const styles = useStyles();
  return (
    <chakra.h2 __css={styles.title} ref={ref} {...rest}>
      {children}
    </chakra.h2>
  );
});

if (__DEV__) {
  CardTitle.displayName = 'CardTitle';
}

export type CardSubtitleProps = HTMLChakraProps<'p'>;

export const CardSubtitle = forwardRef<CardSubtitleProps, 'p'>(({ children, ...rest }, ref) => {
  const styles = useStyles();
  return (
    <chakra.p __css={styles.subtitle} ref={ref} {...rest}>
      {children}
    </chakra.p>
  );
});

if (__DEV__) {
  CardSubtitle.displayName = 'CardSubtitle';
}

export type CardActionProps = HTMLChakraProps<'div'>;

export const CardAction = forwardRef<CardTitleProps, 'div'>(({ children, ...rest }, ref) => {
  const styles = useStyles();
  return (
    <chakra.div __css={styles.title} ref={ref} {...rest}>
      {children}
    </chakra.div>
  );
});

if (__DEV__) {
  CardAction.displayName = 'CardAction';
}

export type CardMediaProps = HTMLChakraProps<'div'>;

export const CardMedia = forwardRef<CardMediaProps, 'div'>(({ children, ...rest }, ref) => {
  const styles = useStyles();

  const mediaStyles: SystemStyleObject = {
    bgSize: 'cover',
    ...styles.media,
  };

  return (
    <chakra.div __css={mediaStyles} ref={ref} {...rest}>
      {children}
    </chakra.div>
  );
});

if (__DEV__) {
  CardMedia.displayName = 'CardMedia';
}

export type CardBodyProps = HTMLChakraProps<'div'>;

export const CardBody = forwardRef<CardBodyProps, 'div'>(({ children, ...rest }, ref) => {
  const styles = useStyles();
  return (
    <chakra.div __css={styles.body} ref={ref} {...rest}>
      {children}
    </chakra.div>
  );
});

if (__DEV__) {
  CardBody.displayName = 'CardBody';
}

export interface CardFooterProps
  extends HTMLChakraProps<'div'>,
    Pick<ButtonGroupProps, 'variant' | 'spacing'> {
  /**
   * The default button variant
   * @default "ghost"
   */
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  variant?: 'Button' extends keyof ThemeTypings['components'] /* @ts-ignore */
    ? ThemeTypings['components']['Button']['variants']
    : Variants;

  /**
   * The spacing between buttons
   * @type SystemProps['margin']
   * @default 2
   */
  spacing?: SystemProps['margin'];
}

export const CardFooter = forwardRef<CardFooterProps, 'div'>((props, ref) => {
  const styles = useStyles();

  const { children, variant = 'ghost', spacing = 2, ...rest } = props;

  const footerStyles: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    '& > div': {
      flex: 1,
    },
    ...styles.footer,
  };

  return (
    <chakra.div __css={footerStyles} ref={ref} {...rest}>
      <ButtonGroup variant={variant} spacing={spacing}>
        {children}
      </ButtonGroup>
    </chakra.div>
  );
});

if (__DEV__) {
  CardFooter.displayName = 'CardFooter';
}
