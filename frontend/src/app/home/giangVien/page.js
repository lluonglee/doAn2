import React from "react";
import { Search } from "lucide-react";

export default function page() {
  return (
    <div className=" h-full flex  justify-center ">
      <div className="row">
        <h1>Thời khóa biểu giảng viên</h1>
        <div className="form-group col-md-6">
          <div className="input-group">
            <input
              id="keyword"
              name="keyword"
              type="text"
              className="form-control ui-autocomplete-input"
              placeholder=" Họ tên"
              autocomplete="off"
            />
            <button className="btn btn-success ml-2" id="btnViewData">
              <Search className="inline-block" />
              Tìm kiếm
            </button>
          </div>
        </div>
        <div className="form-group col-md-4">
          <select className="form-control" id="hocky" name="hocky">
            <option value="42">241 - Học kỳ 1, 2024-2025</option>
          </select>
        </div>
        <input type="hidden" id="masv" name="masv" value="" />
      </div>

      <div className="pageDetail"></div>
    </div>
  );
}
