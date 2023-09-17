using ExcelDataReader;
using Microsoft.AspNetCore.Mvc;
using System.Data;

namespace ImportfromExcel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImportControlller : ControllerBase
    {
        [Route("ReadFile")]
        [HttpPost]
        public async Task<List<List<MyExcel>>> Import(IFormFile file)
        {
            var list = new List<List<MyExcel>>();
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            var httpRequest = HttpContext.Request;
            DataSet dsexcelRecords = new DataSet();
            IExcelDataReader reader = null;
            if (httpRequest.Form.Files.Count > 0)
            {
                var Inputfile = httpRequest.Form.Files[0];
                using (var ms = new MemoryStream())
                {
                    Inputfile.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    string s = Convert.ToBase64String(fileBytes);
                    if (Inputfile != null && ms != null)
                    {
                        if (Inputfile.FileName.ToLower().EndsWith(".xls"))
                            reader = ExcelReaderFactory.CreateBinaryReader(ms);
                        else if (Inputfile.FileName.ToLower().EndsWith(".xlsx"))
                            reader = ExcelReaderFactory.CreateOpenXmlReader(ms);
                        else
                            Console.WriteLine("File type is not a valid type");

                        dsexcelRecords = reader.AsDataSet();
                        reader.Close();
                        if (dsexcelRecords != null && dsexcelRecords.Tables.Count > 0)
                        {
                            DataTable dtdata = dsexcelRecords.Tables[0];
                            var rowcount = dtdata.Rows.Count;
                            var colcount = dtdata.Columns.Count;
                            for (int row = 1; row < rowcount; row++)
                            {
                                List<MyExcel> dataTypes = new List<MyExcel>();
                                for (int col = 0; col < colcount; col++)
                                {
                                    dataTypes.Add(new MyExcel
                                    {
                                        col_name = dtdata.Rows[0][col].ToString(),
                                        col_val = dtdata.Rows[row][col].ToString(),
                                    });
                                }
                                list.Add(dataTypes);
                            }
                        }
                    }
                }
            }
            return list;
        }
    }
}