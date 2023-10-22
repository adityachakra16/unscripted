import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { Loader } from "./index"

export default {
  title: "UI/Loader",
  component: Loader,
} as ComponentMeta<typeof Loader>;

const Template: ComponentStory<typeof Loader> = (args) => (
  <Loader {...args} />
)

export const Default = Template.bind({})
Default.args = {}