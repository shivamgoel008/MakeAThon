/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface IConditionProps {
  condition: boolean | number | string;
}

export const If = (props: React.PropsWithChildren<IConditionProps>): JSX.Element | null => {
  if (props.condition) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};

export const OtherWise = Object.assign(
  (props: React.PropsWithChildren<any>): JSX.Element => {
    return <React.Fragment>{props.children}</React.Fragment>;
  },
  { displayName: 'OtherWise' },
);

export const When = Object.assign(
  (props: React.PropsWithChildren<IConditionProps>): JSX.Element => {
    return <React.Fragment>{props.children}</React.Fragment>;
  },
  { displayName: 'When' },
);

/**
 * Do not use Choose if have more than 5 when.
 * @param props
 * @returns
 */
export const Choose = (props: React.PropsWithChildren<any>) => {
  const single = props.children as any;
  const multiple = props.children as any[];
  if (Array.isArray(props.children)) {
    for (const c of multiple) {
      if ((c.type?.displayName === 'When' && c.props?.condition) || c.type?.displayName === 'OtherWise') {
        return <React.Fragment>{c}</React.Fragment>;
      }
    }
  } else if (single?.type?.displayName === 'When' && single?.props?.condition) {
    return <React.Fragment>{props.children}</React.Fragment>;
  }
  return null;
};
