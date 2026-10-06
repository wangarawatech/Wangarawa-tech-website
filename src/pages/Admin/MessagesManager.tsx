import React, { useState, useEffect } from 'react';
import { db } from '../../services/db';
import { ContactMessage } from '../../types';
import {
  Mail,
  Phone,
  Trash2,
  CheckCircle,
  Clock,
  MessageCircle,
  ExternalLink,
} from 'lucide-react';

export const MessagesManager: React.FC = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

  const reload = () => {
    setMessages(db.getMessages());
  };

  useEffect(() => {
    reload();
  }, []);

  const handleSelect = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    if (!msg.read) {
      db.markMessageRead(msg.id, true);
      reload();
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this message?')) {
      db.deleteMessage(id);
      if (selectedMessage?.id === id) {
        setSelectedMessage(null);
      }
      reload();
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Contact Inquiries Inbox</h2>
          <p className="text-xs text-slate-500">
            Messages, questions, and enrollment inquiries submitted via the public Contact form.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Messages List Column */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm flex flex-col h-[600px]">
          <div className="p-4 border-b border-slate-100 bg-slate-50 flex items-center justify-between text-xs text-slate-500 font-semibold">
            <span>All Messages ({messages.length})</span>
            <span>{messages.filter((m) => !m.read).length} unread</span>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {messages.length === 0 ? (
              <div className="p-8 text-center text-xs text-slate-400">
                No inquiries submitted yet.
              </div>
            ) : (
              messages.map((m) => (
                <div
                  key={m.id}
                  onClick={() => handleSelect(m)}
                  className={`p-4 cursor-pointer transition-colors ${
                    selectedMessage?.id === m.id
                      ? 'bg-blue-50/80'
                      : !m.read
                      ? 'bg-amber-50/50 hover:bg-slate-50'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <p className={`text-xs ${!m.read ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                      {m.name}
                    </p>
                    <span className="text-[10px] text-slate-400">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-xs font-semibold text-slate-800 line-clamp-1 mt-0.5">
                    {m.subject || 'General Inquiry'}
                  </p>

                  <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                    {m.message}
                  </p>

                  {m.serviceOfInterest && (
                    <span className="inline-block mt-1 text-[10px] text-amber-700 bg-amber-100/70 px-1.5 py-0.5 rounded font-medium">
                      {m.serviceOfInterest}
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Message Detail Viewer Column */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm min-h-[400px]">
          {selectedMessage ? (
            <div className="space-y-6">
              <div className="flex items-start justify-between border-b pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedMessage.name}</h3>
                  <p className="text-xs text-slate-500">
                    Received on {new Date(selectedMessage.createdAt).toLocaleString()}
                  </p>
                </div>

                <button
                  onClick={() => handleDelete(selectedMessage.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50"
                  title="Delete message"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Sender Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-xl bg-slate-50 text-xs">
                <div>
                  <span className="text-slate-400 block">Email Address:</span>
                  <a href={`mailto:${selectedMessage.email}`} className="font-semibold text-[#0B2545] hover:underline">
                    {selectedMessage.email}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 block">Phone Number:</span>
                  <a href={`tel:${selectedMessage.phone}`} className="font-semibold text-[#0B2545] hover:underline">
                    {selectedMessage.phone}
                  </a>
                </div>
                {selectedMessage.serviceOfInterest && (
                  <div className="sm:col-span-2">
                    <span className="text-slate-400 block">Program/Service Requested:</span>
                    <span className="font-semibold text-slate-800">{selectedMessage.serviceOfInterest}</span>
                  </div>
                )}
              </div>

              {/* Message Content */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-700 uppercase">Message Body:</h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs sm:text-sm text-slate-800 whitespace-pre-wrap leading-relaxed">
                  {selectedMessage.message}
                </div>
              </div>

              {/* Reply Actions */}
              <div className="pt-4 border-t flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${selectedMessage.email}?subject=Re:%20${encodeURIComponent(selectedMessage.subject || 'Inquiry to Wangarawa Global Technology')}`}
                  className="px-4 py-2 rounded-lg bg-[#0B2545] text-white text-xs font-bold hover:bg-[#133E87] flex items-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>

                <a
                  href={`https://wa.me/${selectedMessage.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedMessage.name)}%2C%20thank%20you%20for%20contacting%20Wangarawa%20Global%20Technology.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 flex items-center gap-1.5"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Reply on WhatsApp</span>
                </a>

                <a
                  href={`tel:${selectedMessage.phone}`}
                  className="px-4 py-2 rounded-lg bg-slate-100 text-slate-800 text-xs font-semibold hover:bg-slate-200 flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {selectedMessage.phone}</span>
                </a>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-20 text-xs space-y-2">
              <Mail className="w-10 h-10 text-slate-300" />
              <p>Select a message on the left to read full details and reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
