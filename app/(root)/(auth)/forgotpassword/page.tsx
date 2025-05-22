"use client";
import { useTranslation } from "next-i18next";
import { Suspense, useState } from "react";
import { Form, Input, Button } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const page = () => {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [formReset] = Form.useForm()
  const [step, setStep] = useState<"form" | "reset">("form");
  const [serverOtp, setServerOtp] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("")
  const [isSend, setIsSend] = useState(false);
  const sendOtpEmail = async (email: string) => {
    const res = await fetch("/api/send-otp", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      toast.success(t("OTP sent to your email"));
      setServerOtp(data.otp);
    } else {
      toast.error(t("Failed to send OTP"));
    }
  };

  const handleSubmit = async (values: any) => {
    await sendOtpEmail(values.email);
    console.log("email", values.email);
    setEmail(values.email)
    setIsSend(!isSend);
  };

  const handleVerifyOtp = async () => {
    if (otp === serverOtp.toString()) {
      toast.success(t("OTP verified successfully"));
      setStep("reset");
    } else {
      toast.error(t("Invalid OTP"));
    }
  };

  const handleResetPassword = async (values: any) => {
    console.log("password", values.password);
    console.log("confirm password", values.confirmPassword);
    console.log("confirm password", email);
    //router.push("/login");
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="h-screen w-full flex items-start pt-20 justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg sm:my-20 my-10 shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            {t("RESET PASSWORD")}
          </h2>

          {step === "form" ? (
            <Form layout="vertical" form={form}>
              <Form.Item
                name="email"
                label={t("Email")}
                rules={[
                  { required: true, message: t("Email is required") },
                  { type: "email", message: t("Invalid email") },
                ]}
              >
                <div className="flex gap-2">
                  <Input />
                  <Button
                    type="primary"
                    className="max-w-[150px] bg-blue-500 hover:bg-blue-700"
                    onClick={() => handleSubmit(form.getFieldsValue())}
                  >
                    {t("Check")}
                  </Button>
                </div>
              </Form.Item>
              {isSend && (
                <>
                  <Form.Item
                    name="otp"
                    label={t("OTP")}
                    rules={[{ required: true, message: t("Otp is required") }]}
                  >
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="mb-4"
                    />
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      onClick={handleVerifyOtp}
                      className="w-full bg-blue-500 hover:bg-blue-700"
                    >
                      {t("Verify OTP")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form>
          ) : (
            <div>
              <Form layout="vertical" form={formReset}>
                <Form.Item
                  name="password"
                  label={t("Password")}
                  rules={[
                    { required: true, message: t("Password is required") },
                    {
                      min: 6,
                      message: t("Password must be at least 6 characters"),
                    },
                  ]}
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  name="confirmPassword"
                  label={t("Confirm Password")}
                  dependencies={["password"]}
                  rules={[
                    {
                      required: true,
                      message: t("Confirm Password is required"),
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(
                          new Error(t("Passwords do not match"))
                        );
                      },
                    }),
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Form>
              <Button
                type="primary"
                onClick={() => handleResetPassword(formReset.getFieldsValue())}
                className="w-full bg-blue-500 hover:bg-blue-700"
              >
                {t("Reset Password")}
              </Button>
            </div>
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default page;
