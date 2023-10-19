import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { Editor } from "./index"

export default {
  title: "UI/Editor",
  component: Editor,
} as ComponentMeta<typeof Editor>;

const Template: ComponentStory<typeof Editor> = (args) => (
  <Editor {...args} />
)

export const Default = Template.bind({})
Default.args = {}