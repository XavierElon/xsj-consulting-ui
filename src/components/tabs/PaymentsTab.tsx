interface Props {}

const PaymentsTab = (props: Props) => {
  return (
    <div className="mx-auto bg-white min-h-screen min-w-screen">
      <div className="flex flex-col h-full w-full container mx-auto">
        <div className="w-5/6 ml-auto">
          <div className="flex mb-4 pt-20">
            <h1 className="text-slate-500">Payments</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentsTab
