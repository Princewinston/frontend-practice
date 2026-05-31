import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

export const taskApi = createApi({
  reducerPath: "task",
  tagTypes: ["Tasks"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}/`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createTask: builder.mutation({
      invalidatesTags: ["Tasks"],
      query: (taskData) => ({
        url: "tasks/",
        method: "POST",
        body: taskData,
      }),
    }),
    updateTask: builder.mutation({
      invalidatesTags: ["Tasks"],
      query: ({ taskData, id }: { taskData: any; id: Number }) => ({
        url: `tasks/${id}/`,
        method: "PATCH",
        body: taskData,
      }),
    }),
    deleteTask: builder.mutation({
      invalidatesTags: ["Tasks"],
      query: (id) => ({
        url: `tasks/${id}/`,
        method: "DELETE",
      }),
    }),
    getTasks: builder.query({
      providesTags: ["Tasks"],
      query: () => "tasks/",
    }),
  }),
});

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useUpdateTaskMutation,
} = taskApi;
