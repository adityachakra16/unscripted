import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { TrailerPageViewContent } from "./index"

export default {
  title: "UI/TrailerPageViewContent",
  component: TrailerPageViewContent,
} as ComponentMeta<typeof TrailerPageViewContent>;

const Template: ComponentStory<typeof TrailerPageViewContent> = (args) => (
  <TrailerPageViewContent {...args} />
)

export const Default = Template.bind({})
Default.args = {}