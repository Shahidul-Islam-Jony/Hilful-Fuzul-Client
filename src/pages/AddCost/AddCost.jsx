import swal from "sweetalert";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const AddCost = () => {
    const axiosPublic = useAxiosPublic();

    const handleDonation = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const village = form.village.value;
        const divission = form.divission.value;
        const items = form.items.value;
        const date = form.date.value;
        const money = form.money.value;
        // console.log(name, village, divission, items, date, money);

        const donation = {
            name,
            village,
            divission,
            items,
            date,
            money
        }
        axiosPublic.post("/add/cost", donation)
            .then(res => {
                if (res.status === 200) {

                    swal("Successful !", "Donation added", "success");
                    form.reset();
                }
            })
            .catch(error => {
                swal("Oops", { error }, "error");
            })

    }

    // prevent changing amount on mouse wheel
    const handleWheel = (e) => {
        e.preventDefault();
    };
    return (
        <div className="mt-28">
            <div className='w-11/12 lg:w-1/2 mx-auto'>
                <h1 className="text-5xl font-bold mb-4 text-center">Add Total Donation</h1>
                <div className="border-2  border-blue-600 rounded-lg w-full shadow-2xl bg-base-100 px-4 py-6">
                    <form onSubmit={handleDonation} className="">
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Benifited People Name</span>
                            </label>
                            <input type="text" name='name' placeholder="Add Benifited People Name" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Village / Town</span>
                            </label>
                            <input type="text" name='village' placeholder="village / town" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Divission</span>
                            </label>
                            <input type="text" name='divission' placeholder="divission" className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Given Item</span>
                            </label>
                            <textarea name="items" className="textarea textarea-bordered h-24 rounded-md w-full border-blue-600" placeholder="List of Item" required></textarea>
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Date</span>
                            </label>
                            <input type="date" name='date' className="input rounded-md w-full border-blue-600" required />
                        </div>
                        <div>
                            <label className="label">
                                <span className="text-xl font-medium">Amount of donation</span>
                            </label>
                            <input type="number" name='money' min="1" onWheel={handleWheel} placeholder="Amount of Money" className="input rounded-md w-full border-blue-600 focus:outline-none focus:ring" required />
                        </div>
                        <div className="form-control mt-6">
                            <input className='btn btn-outline border-blue-600 hover:bg-green-800 capitalize text-xl font-semibold' type="submit" value="Donate" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddCost;