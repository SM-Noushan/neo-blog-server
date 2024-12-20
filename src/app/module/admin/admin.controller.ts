import status from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { AdminServices } from './admin.service';
import sendResponse from '../../utils/sendResponse';

const blockUser = catchAsync(async (req, res) => {
  const result = await AdminServices.blockUserIntoDB(req.params.userId);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const result = await AdminServices.deleteBlogFromDB(req.params.id);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Blog deleted successfully',
    data: result,
  });
});

export const AdminController = {
  blockUser,
  deleteBlog,
};
