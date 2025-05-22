"use client";
import { Images } from "@/constant/images";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
import { loginWithGoogle } from "@/lib/actions/auth";
import { message, Form, Input, Button } from "antd";
import { toast } from "sonner";
import { signup } from "@/modules/services/userServices";
import { useRouter } from "next/navigation";

function SignUp() {
  const { t } = useTranslation("common");
  const [form] = Form.useForm();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [serverOtp, setServerOtp] = useState("");
  const [otp, setOtp] = useState("");
  const router = useRouter();
  const [formValues, setFormValues] = useState<any>(null);
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
      setStep("otp");
    } else {
      toast.error(t("Failed to send OTP"));
    }
  };

  const handleSubmit = async (values: any) => {
    await sendOtpEmail(values.email);
    setFormValues(values);
  };

  const handleVerifyOtp = async () => {
    if (otp === serverOtp.toString()) {
      toast.success(t("OTP verified successfully"));
      const formData = form.getFieldsValue();
      const { email, name, password } = formValues;
      console.log("Form Data:", formData);

      let username = email.split("@")[0];

      let response = await signup(username, password, name, email);
      if (response?.user) {
        localStorage.setItem("user", JSON.stringify(response?.user));
        localStorage.setItem("accessToken", response?.token);
        router.push("/");
      }
    } else {
      toast.error(t("Invalid OTP"));
    }
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="w-full flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg sm:my-20 my-10 shadow-md p-8">
          <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
            {t("SIGN UP")}
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
                <Input />
              </Form.Item>

              <Form.Item
                name="name"
                label={t("Name")}
                rules={[{ required: true, message: t("Name is required") }]}
              >
                <Input />
              </Form.Item>

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

              <Form.Item>
                <Button
                  type="primary"
                  className="w-full bg-blue-500 hover:bg-blue-700"
                  onClick={() => handleSubmit(form.getFieldsValue())}
                >
                  {t("SIGN UP")}
                </Button>
              </Form.Item>

              <div className="text-center text-gray-500">
                <p>
                  {t("Already have an account?")}{" "}
                  <Link
                    href="/signin"
                    className="text-blue-500 hover:underline"
                  >
                    {t("Log in")}
                  </Link>
                </p>
              </div>
            </Form>
          ) : (
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                {t("Enter OTP")}
              </label>
              <Input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="mb-4"
              />
              <Button
                type="primary"
                onClick={handleVerifyOtp}
                className="w-full bg-blue-500 hover:bg-blue-700"
              >
                {t("Verify OTP")}
              </Button>
            </div>
          )}

          <div className="mt-6 text-center text-gray-500">
            <p>{t("or continue with")}</p>
          </div>

          <Button
            onClick={() => loginWithGoogle()}
            className="w-full border mt-2 flex items-center justify-center"
          >
            <Image
              src={Images.googleIcon}
              alt="Google Icon"
              width={20}
              height={20}
              className="mr-2"
            />
            <span className="text-black">{t("Continue with Google")}</span>
          </Button>
        </div>
      </div>
    </Suspense>
  );
}

export default SignUp;
