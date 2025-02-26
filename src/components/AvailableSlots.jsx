import { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function AvailableSlots({ doctorId, selectedDate }) {
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [open, setOpen] = useState(false);

  const [first  , setFirst] = useState("")
  const [last , setLast] = useState("")
  const [notes , setNotes] = useState("")

  const handleOpen = () => setOpen(!open);
  console.log(doctorId)
  useEffect(() => {
    if (!doctorId || !selectedDate) return;


    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/apis/doctors/${doctorId}/slots?data=${selectedDate}`)
      .then((res) => res.json())
      .then((data) => {
        console.warn(data)
        setSlots(data.availableSlots);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [doctorId, selectedDate]);

  const selectedDateFormate = new Date(selectedDate)
  const dateTimeMonth = `${selectedDateFormate.getDate()}-${selectedDateFormate.getMonth()}-${selectedDateFormate.getFullYear()}`


  const onBookSlot = async (e)=>{
    e.preventDefault()
    const response = await fetch(import.meta.env.VITE_API_URL)
    if(response.ok){
      console.log("sucess")

    }
  }


  return (
    <div className="p-4 bg-white shadow-lg rounded-xl w-full">

      <h3 className="text-lg font-semibold  my-3">Available Slots</h3>
      {loading ? (
        <p>Loading slots...</p>
      ) : slots.length > 0 ? (
        <div className="grid grid-cols-3">
          {slots.map((slot) => (
            <button
              key={slot}
              className={`px-4 py-2 h-20  border ${selectedSlot === slot
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
                }`}
              onClick={() => setSelectedSlot(slot)}
            >
              {slot}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-red-500">No available slots for this date.</p>
      )}

      <Dialog open={open} handler={handleOpen}>
        <DialogBody className="flex flex-row justify-center mt-40">
          <form className="w-full max-w-lg h-[60vh]" onSubmit={onBookSlot} >
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                  First Name
                </label>
                <input className="appearance-none block w-full  text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Jane"  onChange={(e)=>setFirst(e.target.value)} value={first} />
                <p className="text-red-500 text-xs italic">Please fill out this field.</p>
              </div>
              <div className="w-full md:w-1/2 px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                  Last Name
                </label>
                <input className="appearance-none block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" onChange={e=>setLast(e.target.value)} value={last} />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                  Notes
                </label>
                <textarea className="appearance-none block w-full 0 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="Notes" type="text" onChange={e=>setNotes(e.target.value)} value={notes} />
                <p className="text-gray-600 text-xs italic">Make it as long and tell what you are going through</p>
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-2">
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-city">
                  Date
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-city" type="text" disabled value={dateTimeMonth} />
              </div>
              <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-zip">
                  Slot
                </label>
                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-zip" type="text" disabled value={selectedSlot} />
              </div>
            </div>
            <div className="mt-6">

              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
              >
                <span>Cancel</span>
              </Button>
              <Button
               type="submit"
                variant="filled"
                color="white"
                className="bg-green-600">
                Book Appointment
              </Button>
            </div>
          </form>
        </DialogBody>
        <DialogFooter>


        </DialogFooter>
      </Dialog>

      {selectedSlot && (
        <button
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          onClick={() => handleOpen()}
        >
          Confirm Booking ({selectedSlot})
        </button>


      )}
    </div>
  );
}

export default AvailableSlots;
