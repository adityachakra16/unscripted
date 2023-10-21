import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { Script } from "./index"

export default {
  title: "UI/Script",
  component: Script,
} as ComponentMeta<typeof Script>;

const Template: ComponentStory<typeof Script> = (args) => (
  <Script {...args} />
)

export const Default = Template.bind({})
Default.args = {}