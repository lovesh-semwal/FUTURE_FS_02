import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


function Dashboard({onLogout}) {

  const [leads, setLeads] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("all");

useEffect(() => {
  fetchLeads();
}, []);

const fetchLeads = async () => {
  try {
    const token = localStorage.getItem("clienttrack_token");

    const response = await axios.get(
      "http://localhost:5000/api/leads",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLeads(response.data.leads);
  } catch (error) {
    setError(
      error.response?.data?.message ||
        "Failed to fetch leads"
    );
  } finally {
    setLoading(false);
  }
};

const updateStatus = async (leadId, newStatus) => {
  try {
    const token = localStorage.getItem("clienttrack_token");

    await axios.put(
      `http://localhost:5000/api/leads/${leadId}/status`,
      {
        status: newStatus,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead._id === leadId
          ? { ...lead, status: newStatus }
          : lead
      )
    );
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to update status"
    );
  }
};

const newLeads = leads.filter(
  (lead) => lead.status === "new"
).length;

const contactedLeads = leads.filter(
  (lead) => lead.status === "contacted"
).length;

const convertedLeads = leads.filter(
  (lead) => lead.status === "converted"
).length;

const chartData = [
  {
    name: "New",
    value: newLeads,
  },
  {
    name: "Contacted",
    value: contactedLeads,
  },
  {
    name: "Converted",
    value: convertedLeads,
  },
];

const filteredLeads = leads.filter((lead) => {
  const matchesSearch =
    lead.name.toLowerCase().includes(search.toLowerCase()) ||
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    lead.company?.toLowerCase().includes(search.toLowerCase());

  const matchesStatus =
    statusFilter === "all" || lead.status === statusFilter;

  return matchesSearch && matchesStatus;
});


const addNote = async (leadId) => {
  const text = window.prompt("Enter follow-up note:");

  if (!text || !text.trim()) {
    return;
  }

  try {
    const token = localStorage.getItem("clienttrack_token");

    const response = await axios.post(
      `http://localhost:5000/api/leads/${leadId}/notes`,
      {
        text: text.trim(),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setLeads((currentLeads) =>
      currentLeads.map((lead) =>
        lead._id === leadId ? response.data.lead : lead
      )
    );
  } catch (error) {
    alert(
      error.response?.data?.message ||
        "Failed to add note"
    );
  }
};


  const admin = JSON.parse(
    localStorage.getItem("clienttrack_admin")
  );

  const handleLogout = () => {
    localStorage.removeItem("clienttrack_token");
localStorage.removeItem("clienttrack_admin");
onLogout();
  };

  return (
  <div className="min-h-screen bg-slate-100">
    <Navbar admin={admin} onLogout={handleLogout} />

    <main className="mx-auto! max-w-7xl px-6 py-10">
      <h2 className="text-3xl font-bold text-slate-900">
        Dashboard
      </h2>

      <p className="mt-2 text-slate-500">
        Manage and track your client leads.
      </p>

      {/* Statistics */}
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            New Leads
          </p>

          <p className="mt-2 text-3xl font-bold text-blue-600">
            {newLeads}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Contacted
          </p>

          <p className="mt-2 text-3xl font-bold text-orange-500">
            {contactedLeads}
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">
            Converted
          </p>

          <p className="mt-2 text-3xl font-bold text-green-600">
            {convertedLeads}
          </p>
        </div>
      </div>

      {/* Analytics */}
      <div className="mb-8 mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-4">
          <h2 className="text-xl font-bold text-slate-900">
            Lead Analytics
          </h2>

          <p className="text-sm text-slate-500">
            Distribution of leads by current status
          </p>
        </div>

        <div className="h-80">
  <ResponsiveContainer width="100%" height="100%">
    <PieChart>
      <Pie
        data={chartData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        outerRadius={100}
        label
      >
        {chartData.map((entry, index) => {
          const colors = ["#2563eb", "#f97316", "#16a34a"];

          return (
            <Cell
              key={`cell-${index}`}
              fill={colors[index]}
            />
          );
        })}
      </Pie>

      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>
      </div>

      {/* Search and Filter */}
      <div className="mb-6 mt-6 flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          placeholder="Search by name, email or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        />

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
        >
          <option value="all">All Status</option>
          <option value="new">New</option>
          <option value="contacted">Contacted</option>
          <option value="converted">Converted</option>
        </select>
      </div>

      {/* Leads Table */}
      <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900">
            Recent Leads
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Leads submitted through your website.
          </p>
        </div>

        {loading && (
          <p className="text-slate-500">
            Loading leads...
          </p>
        )}

        {error && (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && leads.length === 0 && (
          <p className="text-slate-500">
            No leads found.
          </p>
        )}

        {!loading && leads.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full min-w-200">
              <thead>
                <tr className="border-b text-left text-sm text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Notes</th>
                </tr>
              </thead>

              <tbody>
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead._id}
                    className="border-b last:border-b-0"
                  >
                    <td className="px-4 py-4 font-medium text-slate-800">
                      {lead.name}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {lead.email}
                    </td>

                    <td className="px-4 py-4 text-slate-600">
                      {lead.company || "—"}
                    </td>

                    <td className="px-4 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) =>
                          updateStatus(
                            lead._id,
                            e.target.value
                          )
                        }
                        className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium capitalize text-slate-700 outline-none focus:border-blue-500"
                      >
                        <option value="new">New</option>
                        <option value="contacted">
                          Contacted
                        </option>
                        <option value="converted">
                          Converted
                        </option>
                      </select>
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-500">
                      {new Date(
                        lead.createdAt
                      ).toLocaleDateString()}
                    </td>

                    <td className="px-4 py-4">
                      <button
                        onClick={() => addNote(lead._id)}
                        className="rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                      >
                        Add Note
                      </button>

                      {lead.notes?.length > 0 && (
                        <div className="mt-3 space-y-2">
                          {lead.notes.map((note, index) => (
                            <div
                              key={index}
                              className="rounded-lg bg-slate-50 p-3"
                            >
                              <p className="text-sm text-slate-700">
                                {note.text}
                              </p>

                              <p className="mt-1 text-xs text-slate-400">
                                {new Date(
                                  note.createdAt
                                ).toLocaleString()}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  </div>
);
}

export default Dashboard;