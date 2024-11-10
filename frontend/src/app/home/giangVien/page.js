import React from "react";

export default function page() {
  return (
    <div className=" h-full flex justify-center ">
      <h2>Thời khóa biểu giảng viên</h2>
      <div className="row">
        <div className="form-group col-md-6">
          <div className="input-group">
            <input
              id="keyword"
              name="keyword"
              type="text"
              className="form-control ui-autocomplete-input"
              placeholder="Mã SV / Họ tên. Ví dụ: 14001001, nguyenvan, Nguyễn Văn, ..."
              autocomplete="off"
            />
            <div className="input-group-btn">
              <button className="btn btn-success" id="btnViewData">
                <i className="fa fa-search"></i> Tìm kiếm
              </button>
            </div>
          </div>
        </div>
        <div className="form-group col-md-4">
          <select className="form-control" id="hocky" name="hocky">
            <option value="42">241 - Học kỳ 1, 2024-2025</option>
          </select>
        </div>
        <input type="hidden" id="masv" name="masv" value="" />
      </div>
    </div>
  );
}
