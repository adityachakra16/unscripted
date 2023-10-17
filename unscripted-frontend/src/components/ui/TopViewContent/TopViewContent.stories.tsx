import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { TopViewContent } from "./index"

export default {
  title: "UI/TopViewContent",
  component: TopViewContent,
} as ComponentMeta<typeof TopViewContent>;

const Template: ComponentStory<typeof TopViewContent> = (args) => (
  <TopViewContent {...args} />
)

export const Default = Template.bind({})
Default.args = {}