export default async function AddressPage(props: PageProps<{ id: string }>) {
  const { id } = await props.params

  return <div>Order Page</div>
}
