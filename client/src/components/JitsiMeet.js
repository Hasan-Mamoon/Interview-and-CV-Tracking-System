import React, { useEffect, useRef, useState } from "react";

const JitsiMeet = () => {
  const jitsiContainer = useRef(null);
  const [roomName, setRoomName] = useState("");
  const [scheduledMeetings, setScheduledMeetings] = useState([]);

  useEffect(() => {
    if (roomName) {
      const domain = "meet.jit.si"; // Public Jitsi server
      const options = {
        roomName,
        width: "100%",
        height: "100%",
        parentNode: jitsiContainer.current,
        interfaceConfigOverwrite: {
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
        configOverwrite: {
          startWithAudioMuted: true,
          startWithVideoMuted: true,
        },
        userInfo: {
          displayName: "Guest",
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose(); // Cleanup on component unmount
      };
    }
  }, [roomName]);

  // Handle Meeting Scheduling
  const handleScheduleMeeting = (e) => {
    e.preventDefault();
    const meetingName = e.target.meetingName.value;
    const meetingTime = e.target.meetingTime.value;
    const meetingId = Math.random().toString(36).substr(2, 9);
    
    const newMeeting = {
      id: meetingId,
      name: meetingName,
      time: meetingTime,
      link: `https://meet.jit.si/${meetingName}`,
    };

    setScheduledMeetings([...scheduledMeetings, newMeeting]);
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h2 className="text-xl font-semibold mb-4">Jitsi Meet Scheduler</h2>

      {/* Meeting Scheduling Form */}
      <form onSubmit={handleScheduleMeeting} className="mb-6 flex flex-col gap-2">
        <input
          type="text"
          name="meetingName"
          placeholder="Enter Meeting Name"
          required
          className="border p-2 rounded-md"
        />
        <input
          type="datetime-local"
          name="meetingTime"
          required
          className="border p-2 rounded-md"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Schedule Meeting
        </button>
      </form>

      {/* Display Scheduled Meetings */}
      <h3 className="text-lg font-semibold mb-2">Upcoming Meetings</h3>
      <ul className="w-full max-w-md">
        {scheduledMeetings.map((meeting) => (
          <li key={meeting.id} className="border p-2 rounded-md flex justify-between items-center mb-2">
            <div>
              <p className="font-semibold">{meeting.name}</p>
              <p className="text-sm text-gray-500">📅 {meeting.time}</p>
            </div>
            <button
              onClick={() => setRoomName(meeting.name)}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Start
            </button>
          </li>
        ))}
      </ul>

      {/* Jitsi Meeting Area */}
      {roomName && (
        <div className="w-full h-[600px] mt-4 border rounded-md">
          <div ref={jitsiContainer} className="w-full h-full"></div>
        </div>
      )}
    </div>
  );
};

export default JitsiMeet;
