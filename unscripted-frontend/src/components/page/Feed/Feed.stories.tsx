import { ComponentStory, ComponentMeta } from "@storybook/react"

import { FeedPageView } from "./View"

export default {
  title: "Page/Feed",
  component: FeedPageView,
} as ComponentMeta<typeof FeedPageView>;

const Template: ComponentStory<typeof FeedPageView> = (args) => (
  <FeedPageView {...args} />
)

export const Default = Template.bind({})
Default.args = {}