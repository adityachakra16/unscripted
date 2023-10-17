import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { CreatePageViewContent } from "./index"

export default {
  title: "UI/CreatePageViewContent",
  component: CreatePageViewContent,
} as ComponentMeta<typeof CreatePageViewContent>;

const Template: ComponentStory<typeof CreatePageViewContent> = (args) => (
  <CreatePageViewContent {...args} />
)

export const Default = Template.bind({})
Default.args = {}