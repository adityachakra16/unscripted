import { ComponentStory, ComponentMeta } from "@storybook/react"
import React from "react"

import { LoginModal } from "./index"

export default {
  title: "UI/LoginModal",
  component: LoginModal,
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => (
  <LoginModal {...args} />
)

export const Default = Template.bind({})
Default.args = {}