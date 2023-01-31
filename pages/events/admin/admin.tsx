import { GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { getUserBySessionToken } from '../../../database/users';

type Props = {
  eventsss: Event[];
};

export default function Admin(props: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [eventNameInput, setEventNameInput] = useState('');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [dateInput, setDateInput] = useState<string>();
  const [priceInput, setPriceInput] = useState(false);
  const [categoryIdInput, setCategoryIdInput] = useState(0);
  const [onEditId, setOnEditId] = useState<number>(0);

  // calling all events from the database
  async function getEventsFromApi() {
    setEvents(props.eventsss);
  }

  async function createEventFromApi() {
    if (onEditId > 0) {
      updateEventFromApiById();
    } else {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          eventName: eventNameInput,
          description: descriptionInput,
          address: addressInput,
          eventDate: dateInput,
          categoryId: categoryIdInput,
          free: priceInput,
        }),
      });

      const eventFromApi = (await response.json()) as Event;
      const newState = [...events, eventFromApi];

      setEvents(newState);
      // clearStatus();
    }
  }

  // async function deleteEventFromApiById(id: number) {
  //   const response = await fetch(`/api/events/${id}`, {
  //     method: 'DELETE',
  //   });
  //   const deletedEvent = (await response.json()) as Event;

  //   const filteredEvent = events.filter((event) => {
  //     return event.id !== deletedEvent.id;
  //   });

  //   setEvents(filteredEvent);
  // }

  async function updateEventFromApiById() {
    const id = onEditId;
    const response = await fetch(`/api/events/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        eventId: onEditId.toString(),
        eventName: eventNameInput,
        description: descriptionInput,
        address: addressInput,
        eventDate: dateInput,
        categoryId: categoryIdInput,
        free: priceInput,
      }),
    });
    const updatedEventFromApi = (await response.json()) as Event;

    //   const newState = events.map((event) => {
    //     if (event.id === updatedEventFromApi.id) {
    //       return updatedEventFromApi;
    //     } else {
    //       return event;
    //     }
    //   });
    //   clearStatus();
    //   setEvents(newState);
    // }
    // async function edit(id: number) {
    //   const e = events.find((e) => e.id === id);
    //   if (e) {
    //     setAddressInput(e.address);
    //     setEventNameInput(e.eventName);
    //     setImage(e.image);
    //     setDescriptionInput(e.description);
    //     setDateInput(e.eventDate.split('T')[0]);
    //     setCategoryIdInput(e.categoryId);
    //     setPriceInput(e.free);
    //     setOnEditId(e.id);
    //   } else {
    //     alert('event not found id: ' + id);
    //   }
    // }

    function clearStatus() {
      setOnEditId(0);
      setAddressInput('');
      setEventNameInput('');
      setDescriptionInput('');
      setDateInput('');
      setCategoryIdInput(0);
      setPriceInput(false);
    }

    // useEffect(() => {
    //   getEventsFromApi().catch((err) => {
    //     console.log(err);
    //   });
    // }, []);

    return (
      <>
        <Head>
          <title>Frontend event api</title>
          <meta name="description" content=" admin form " />
        </Head>
        <div>
          <div>
            <h1>Events Form</h1>
            <div>
              <input
                placeholder="Event Name"
                value={eventNameInput}
                required
                onChange={(event) => {
                  setEventNameInput(event.currentTarget.value);
                }}
              />

              <br />

              <br />
              <textarea
                placeholder="Description"
                required
                value={descriptionInput}
                onChange={(event) => {
                  setDescriptionInput(event.currentTarget.value);
                }}
              />

              <br />

              <input
                placeholder="Location"
                required
                value={addressInput}
                onChange={(event) => {
                  setAddressInput(event.currentTarget.value);
                }}
              />

              <br />
              <div>
                {' '}
                <input
                  type="date"
                  value={dateInput}
                  required
                  onChange={(event) => {
                    setDateInput(event.currentTarget.value);
                  }}
                />
                <br />
                <div>
                  {' '}
                  <button
                    onClick={async () => {
                      await createEventFromApi();
                    }}
                  >
                    submit
                  </button>
                  <button
                    onClick={() => {
                      clearStatus();
                    }}
                  >
                    clear
                  </button>
                </div>
                <hr />
              </div>

              {/* <div>
            <h2>Your created events</h2>
            <input
              placeholder="search your events"
              onChange={(e) => {
                if (filteredEvents.length <= 0) {
                  setFilteredEvents(events);
                }

                if (e.currentTarget.value.length <= 0) {
                  setEvents(filteredEvents);
                } else {
                  const filteredEvent = events.filter((event) => {
                    return event.eventName.includes(e.currentTarget.value);
                  });

                  setEvents(filteredEvent);
                }
              }}
            />
            {events?.map((event) => {
              return (
                <div key={`eventId-${event.id}`}>
                  <div>Event: {event.eventName} </div>
                  <div>
                    <Link href={`/events/admin/${event.id}`}> more</Link>
                    <button
                      onClick={() => {
                        edit(event.id);
                      }}
                    >
                      edit
                    </button>
                    <a
                      onClick={async () => {
                        const result = confirm('Want to delete?');
                        if (result) {
                          await deleteEventFromApiById(event.id);
                        }
                      }}
                    ></a>
                  </div>
                </div>
              );
            })}
          </div> */}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const token = context.req.cookies.sessionToken;
  const user = token && (await getUserBySessionToken(token));

  if (!user) {
    return {
      redirect: {
        destination: '/login?returnTo=/private-profile',
        permanent: false,
      },
    };
  }
  const eventsByLogedInUser = user && (await getEventByLogedInUser(user.id));

  return {
    props: {
      eventsss: JSON.parse(JSON.stringify(eventsByLogedInUser)),
      user: user,
    },
  };
}
