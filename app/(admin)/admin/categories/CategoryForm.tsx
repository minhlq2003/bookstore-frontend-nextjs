'use client'

import { Category } from '@/constant/types'
import { Form, FormInstance, Input } from 'antd'

interface CategoryFormProps {
  form: FormInstance
  onFinish: (values: Category) => void
  onFinishFailed?: () => void
  initialValues?: Partial<CategoryFormValues>
}

export interface CategoryFormValues {
  name: string
  slug: string
  description?: string
}

export default function CategoryForm({
  form,
  onFinish,
  onFinishFailed,
  initialValues,
}: CategoryFormProps) {
  return (
    <Form
      form={form}
      layout='vertical'
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      initialValues={initialValues}
    >
      <Form.Item
        label='Tên danh mục'
        name='name'
        rules={[{ required: true, message: 'Vui lòng nhập tên danh mục!' }]}
      >
        <Input
          onBlur={() => {
            const slug = form.getFieldValue("name").trim().replace(/\s+/g, '-').toLowerCase()
            console.log("slug=", slug);

            form.setFieldValue("slug", slug)
          }}
          placeholder='Nhập tên danh mục' />
      </Form.Item>

      <Form.Item
        label='Slug'
        name='slug'
        rules={[{ required: true, message: 'Vui lòng nhập slug!' }]}
      >
        <Input placeholder='Nhập slug danh mục' />
      </Form.Item>

      <Form.Item label='Mô tả' name='description'>
        <Input.TextArea placeholder='Nhập mô tả (tùy chọn)' rows={4} />
      </Form.Item>
    </Form>
  )
}
