import React from 'react';
import { Story, ComponentStory, ComponentMeta } from '@storybook/react';

import { Typography, ITypography } from './Typography'


const SHORT_TEXT_SAMPLE: string = 'Short string to test typograpnhy'
const LONG_TEXT_SAMPLE: string = 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Odio quis inventore quidem mollitia magni, iste illo labore repudiandae! Fugiat molestiae explicabo eligendi aliquid optio voluptatibus necessitatibus ut beatae vero enim.'

export default {
  title: 'components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

/**
 * All typographies sotry
 */

const TemplateAll: Story<{}> = (args) => {
  return (
    <div>
      <div>
        <Typography size="xs">H1</Typography>
        <Typography size="h1">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">H2</Typography>
        <Typography size="h2">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">H3</Typography>
        <Typography size="h3">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">H4</Typography>
        <Typography size="h4">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">H5</Typography>
        <Typography size="h5">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">XL</Typography>
        <Typography size="xl">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">L</Typography>
        <Typography size="l">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">M</Typography>
        <Typography size="m">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">S</Typography>
        <Typography size="s">
          {SHORT_TEXT_SAMPLE}
        </Typography>
        <Typography size="xs">XS</Typography>
        <Typography size="xs">
          {SHORT_TEXT_SAMPLE}
        </Typography>
      </div>
    </div>
  );
}

export const AllTypography = TemplateAll.bind({});

/**
 * Single typography stories
 */
const Template: ComponentStory<typeof Typography> = (args: ITypography) => {
  return (
    <div>
      <div>
        <Typography size="xs">Short text:</Typography>
        <Typography {...args}>
          {SHORT_TEXT_SAMPLE}
        </Typography>
      </div>
      <div>
        <Typography size="xs">Short text:</Typography>
        <Typography {...args}>
          {LONG_TEXT_SAMPLE}
        </Typography>
      </div>
    </div>
  );
};


export const H1 = Template.bind({});
H1.args = {
  size: 'h1',
};

export const H2 = Template.bind({});
H2.args = {
  size: 'h2',
};

export const H3 = Template.bind({});
H3.args = {
  size: 'h3',
};

export const H4 = Template.bind({});
H4.args = {
  size: 'h4',
};

export const H5 = Template.bind({});
H5.args = {
  size: 'h5',
};

export const XL = Template.bind({});
XL.args = {
  size: 'xl',
};

export const L = Template.bind({});
L.args = {
  size: 'l',
};

export const M = Template.bind({});
M.args = {
  size: 'm',
};

export const S = Template.bind({});
S.args = {
  size: 's',
};

export const XS = Template.bind({});
XS.args = {
  size: 'xs',
};


