export default async function OrderPage(props: PageProps<{ id: string }>) {
  const { id } = await props.params

  return <div>Order Page</div>
}
