export default async function(context) {
  const res = await context.$axios.$post("https://reqres.in/api/login", {
    email: "eve.holt@reqres.in",
    password: "cityslicka"
  });
  if(res.token !== "QpwL5tke4Pnpja7X4") {
      return context.redirect("/")
  }
}
