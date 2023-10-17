import { ComponentStory, ComponentMeta } from "@storybook/react"

import { TrailersPageView } from "./View"

export default {
  title: "Page/Trailers",
  component: TrailersPageView,
} as ComponentMeta<typeof TrailersPageView>;

const Template: ComponentStory<typeof TrailersPageView> = (args) => (
  <TrailersPageView {...args} />
)

export const Default = Template.bind({})
Default.args = {}