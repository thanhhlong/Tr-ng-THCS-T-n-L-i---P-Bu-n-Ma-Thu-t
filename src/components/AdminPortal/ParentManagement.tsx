import React, { useState } from 'react';
import { mockStudents9A1 } from '../../data/mockData';
import { Users, Search, Phone, Mail, MessageSquare, CheckCircle } from 'lucide-react';

export const ParentManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const parentsList = mockStudents9A1.map((s, idx) => ({
    id: `ph-${s.id}`,
    code: `PH${s.code.replace('HS', '')}`,
    parentName: s.parentName,
    parentPhone: s.parentPhone,
    email: `ph.student${idx + 1}@gmail.com`,
    studentName: s.name,
    studentCode: s.code,
    className: '9A1',
    status: 'Đã kích hoạt',
  }));

  const filteredParents = parentsList.filter(
    (p) =>
      p.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.parentPhone.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-xs">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Users className="w-6 h-6 text-amber-600" />
            <span>QUẢN LÝ TÀI KHOẢN PHỤ HUYNH ({parentsList.length})</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">Sổ liên lạc điện tử, liên kết tài khoản PHHS & thông báo tự động</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative flex-1 w-full">
        <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
        <input
          type="text"
          placeholder="Tìm tên phụ huynh, tên con, số điện thoại..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white text-slate-900 border border-slate-200 rounded-xl text-xs font-medium focus:outline-hidden ring-1 ring-slate-200"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="p-4">MÃ PH & HỌ TÊN PHỤ HUYNH</th>
                <th className="p-4">HỌC SINH LIÊN KẾT</th>
                <th className="p-4">SỐ ĐIỆN THOẠI & EMAIL</th>
                <th className="p-4">TRẠNG THÁI KHỞI TẠO</th>
                <th className="p-4 text-right">LIÊN LẠC</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredParents.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-slate-900">{p.parentName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">Mã PH: {p.code}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-bold text-blue-900">{p.studentName}</div>
                    <div className="text-[10px] text-slate-500">
                      Mã HS: {p.studentCode} • Lớp {p.className}
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="text-[11px] text-slate-800 flex items-center gap-1 font-bold">
                      <Phone className="w-3 h-3 text-slate-400" /> {p.parentPhone}
                    </div>
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Mail className="w-3 h-3 text-slate-400" /> {p.email}
                    </div>
                  </td>

                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      {p.status}
                    </span>
                  </td>

                  <td className="p-4 text-right">
                    <button
                      onClick={() => alert(`Gửi tin nhắn SMS/Nội bộ cho PH ${p.parentName}`)}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 text-xs font-bold border border-amber-200 flex items-center space-x-1.5 ml-auto"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-amber-600" />
                      <span>Gửi Tin Nhắn</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
