import { Typography, ITypography } from './Typography'

export default {
  title: 'components/Typography',
  component: Typography,
};

const Template = (args: ITypography) => {
  return (
    <div>
      <Typography {...args}>
        Test value to validate string
      </Typography>
    </div>
  );
};

export const H1Story = {
  args: {
    size: 'h1',
  },
};

export const H2Story = {
  args: {
    size: 'h2',
  },
};
