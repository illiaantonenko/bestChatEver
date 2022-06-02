import React from 'react';
import { Story, ComponentMeta } from '@storybook/react';

import { Typography } from './Typography'


const SHORT_TEXT_SAMPLE: string = 'Short string to test typograpnhy';

export default {
  title: 'components/Typography',
  component: Typography,
} as ComponentMeta<typeof Typography>;

/**
 * All typographies sotry
 */

const TemplateAll: Story<{ content: string }> = ({ content }) => {
  return (
    <div>
      <div>
        {/* Headings */}
        <Typography size="c2">H1</Typography>
        <Typography size="h1">
          {content}
        </Typography>
        <Typography size="c2">H2</Typography>
        <Typography size="h2">
          {content}
        </Typography>
        <Typography size="c2">H3</Typography>
        <Typography size="h3">
          {content}
        </Typography>
        <Typography size="c2">H4</Typography>
        <Typography size="h4">
          {content}
        </Typography>
        <Typography size="c2">H5</Typography>
        <Typography size="h5">
          {content}
        </Typography>
        <Typography size="c2">H6</Typography>
        <Typography size="h6">
          {content}
        </Typography>
        {/* Body text */}
        <Typography size="c2">S1</Typography>
        <Typography size="s1">
          {content}
        </Typography>
        <Typography size="c2">S2</Typography>
        <Typography size="s2">
          {content}
        </Typography>
        <Typography size="c2">B1</Typography>
        <Typography size="b1">
          {content}
        </Typography>
        <Typography size="c2">B2</Typography>
        <Typography size="b2">
          {content}
        </Typography>
        <Typography size="c2">C1</Typography>
        <Typography size="c1">
          {content}
        </Typography>
        <Typography size="c2">C2</Typography>
        <Typography size="c2">
          {content}
        </Typography>
        <Typography size="c2">Button</Typography>
        <Typography size="button">
          {content}
        </Typography>
        <Typography size="c2">Overline</Typography>
        <Typography size="overline">
          {content}
        </Typography>
      </div>
    </div>
  );
}

export const AllTypography = TemplateAll.bind({});
AllTypography.args = {
  content: SHORT_TEXT_SAMPLE,
}
