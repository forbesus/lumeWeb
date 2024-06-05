import { j as jsxRuntimeExports, r as reactExports } from "./index-BIsqO_uY.js";
import { z, u as useForm, g as getZodConstraint, p as parseWithZod, a as getFormProps } from "./parse-C3g2df8G.js";
import { B as Button } from "./button-CM1o2_Dc.js";
import { l as logoPng } from "./lume-logo-ChvyOqr_.js";
import { d as discordLogoPng, l as lumeColorLogoPng } from "./discord-logo-aRR5czcd.js";
import { l as lumeBgPng } from "./lume-bg-image-iQ8CqrJl.js";
import { F as Field, a as FieldCheckbox } from "./forms-uCsZ1COU.js";
import { F as Ft, g as ge, d as ae } from "./index-Cb6cVh9L.js";
import { L as Link } from "./components-C01XGMk1.js";
import "./utils-Hh79uNMy.js";
import "./index-CVPXomLy.js";
import "./index-BVHF9LaM.js";
const meta = () => {
  return [{
    title: "Login"
  }, {
    name: "description",
    content: "Welcome to Lume!"
  }];
};
function Login() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", {
    className: "p-10 h-screen relative",
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("header", {
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
        src: logoPng,
        alt: "Lume logo",
        className: "h-10"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx("div", {
      className: "fixed inset-0 -z-10 overflow-clip",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", {
        src: lumeBgPng,
        alt: "Lume background",
        className: "absolute top-0 right-0 md:w-2/3 object-cover z-[-1]"
      })
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(LoginForm, {}), /* @__PURE__ */ jsxRuntimeExports.jsx("footer", {
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
const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  rememberMe: z.boolean().optional()
});
const LoginForm = () => {
  const login = Ft();
  const go = ge();
  const parsed = ae();
  const [form, fields] = useForm({
    id: "login",
    constraint: getZodConstraint(LoginSchema),
    onValidate({
      formData
    }) {
      return parseWithZod(formData, {
        schema: LoginSchema
      });
    },
    shouldValidate: "onSubmit",
    onSubmit(e, {
      submission
    }) {
      var _a;
      e.preventDefault();
      if ((submission == null ? void 0 : submission.status) === "success") {
        const data = submission.value;
        login.mutate({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe ?? false,
          redirectTo: (_a = parsed.params) == null ? void 0 : _a.to
        });
      }
    }
  });
  reactExports.useEffect(() => {
    if (form.status === "success") {
      go({
        to: "/login/otp",
        type: "push"
      });
    }
  }, [form.status, go]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", {
    className: "w-full p-2 max-w-md space-y-3 mt-12 bg-background",
    ...getFormProps(form),
    children: [/* @__PURE__ */ jsxRuntimeExports.jsx("h2", {
      className: "text-3xl font-bold !mb-12",
      children: "Welcome back! 🎉"
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Field, {
      inputProps: {
        name: fields.email.name
      },
      labelProps: {
        children: "Email"
      },
      errors: fields.email.errors
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Field, {
      inputProps: {
        name: fields.password.name,
        type: "password"
      },
      labelProps: {
        children: "Password"
      },
      errors: fields.password.errors
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(FieldCheckbox, {
      inputProps: {
        name: fields.rememberMe.name,
        form: form.id
      },
      labelProps: {
        children: "Remember Me"
      },
      errors: fields.rememberMe.errors
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
      className: "w-full h-14",
      children: "Login"
    }), /* @__PURE__ */ jsxRuntimeExports.jsxs("p", {
      className: "inline-block text-input-placeholder",
      children: ["Forgot your password?", " ", /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
        to: "/reset-password",
        className: "text-primary-1 text-md hover:underline hover:underline-offset-4",
        children: "Reset Password"
      })]
    }), /* @__PURE__ */ jsxRuntimeExports.jsx(Link, {
      to: "/register",
      className: "block",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, {
        type: "button",
        className: "w-full h-14",
        variant: "outline",
        children: "Create an Account"
      })
    })]
  });
};
export {
  Login as default,
  meta
};
