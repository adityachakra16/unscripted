import { ComponentStory, ComponentMeta } from "@storybook/react"

import { CreatePageView } from "./View"

export default {
  title: "Page/Create",
  component: CreatePageView,
} as ComponentMeta<typeof CreatePageView>;

const Template: ComponentStory<typeof CreatePageView> = (args) => (
  <CreatePageView {...args} />
)

export const Default = Template.bind({})
Default.args = {}