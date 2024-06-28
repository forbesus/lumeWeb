import { j as jsxRuntimeExports } from "./index-DVnsepjX.js";
import { B as Button } from "./button-hVCKfBoZ.js";
import { l as logoPng } from "./lume-logo-ChvyOqr_.js";
import { d as discordLogoPng, l as lumeColorLogoPng } from "./discord-logo-aRR5czcd.js";
import { F as Field } from "./forms-Dnl1SnJr.js";
import { z } from "./index-Ja1h8Z59.js";
import { f as ToastAction } from "./toast-0-e1CPH4.js";
import { w as we } from "./index-BMDhszXN.js";
import { u as useForm, g as getZodConstraint, p as parseWithZod, a as getFormProps } from "./parse-Bf82GLPO.js";
import { L as Link } from "./components-CpdSlbpj.js";
import "./utils-DrdLlttq.js";
import "./index-Lqs8kr3m.js";
import "./index-BPJinGo7.js";
import "./index-CfGbtR8T.js";
const lumeBgPng = "/assets/lume-bg-reset-password-BttR11xa.png";
const meta = () => {
  return [{
    title: "Sign Up"
  }];
};
const RecoverPasswordSchema = z.object({
  email: z.string().email()
});
function RecoverPassword() {
  const {
    open
  } = we();
  const [form, fields] = useForm({
    id: "sign-up",
    constraint: getZodConstraint(RecoverPasswordSchema),
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: RecoverPasswordSchema
      });
    },
    onSubmit(e) {
      e.preventDefault();
      open == null ? void 0 : open({
        type: "success",
        message: "Password reset email sent",
        description: "Check your email for a link to reset your password. If it doesn’t appear within a few minutes, check your spam folder.",
        action: /* @__PURE__ */ jsxRuntimeExports.jsx(ToastAction, {
          altText: "Cancel",
          children: "Cancel"
        }),
        cancelMutation: () => {
          console.log("cancel mutation");
        }
      });
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "p-10 h-screen relative",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("header", {
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
        src: logoPng,
        alt: "Lume logo",
        className: "h-10"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("form", {
      className: "w-full p-2 max-w-md space-y-4 mt-12 bg-background",
      ...getFormProps(form),
      children: [/* @__PURE__ */ jsxRuntimeExports.jsx("p", {
        className: "text-input-placeholder w-full text-left mb-10",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
          to: "/login",
          className: "text-foreground text-md hover:underline hover:underline-offset-4",
          children: "← Back to Login"
        })
      }), /* @__PURE__ */ jsxRuntimeExports.jsx("span", {
        className: "!mb-12 space-y-2",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
          className: "text-3xl font-bold",
          children: "Reset your password"
        })
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Field, {
        inputProps: {
          name: fields.email.name
        },
        labelProps: {
          children: "Email Address"
        },
        errors: fields.email.errors
      }), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
        className: "w-full h-14",
        children: "Reset Password"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "fixed inset-0 -z-10 overflow-clip",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
        src: lumeBgPng,
        alt: "Lume background",
        className: "absolute top-0 right-0 md:w-2/3 sm:h-full object-cover z-[-1]"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("footer", {
      className: "my-5",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", {
        className: "flex flex-row",
        children: [/* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
            to: "https://discord.lumeweb.com",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
              variant: "link",
              className: "flex flex-row gap-x-2 text-input-placeholder",
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("img", {
                className: "h-5",
                src: discordLogoPng,
                alt: "Discord Logo"
              }), "Connect with us"]
            })
          })
        }), /* @__PURE__ */ jsxRuntimeExports.jsx("li", {
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
            to: "https://lumeweb.com",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, {
              variant: "link",
              className: "flex flex-row gap-x-2 text-input-placeholder",
              children: [/* @__PURE__ */ jsxRuntimeExports.jsx("img", {
                className: "h-5",
                src: lumeColorLogoPng,
                alt: "Lume Logo"
              }), "Connect with us"]
            })
          })
        })]
      })
    })]
  });
}
export {
  RecoverPassword as default,
  meta
};
