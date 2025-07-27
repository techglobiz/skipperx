'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function CoursesManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = async () => {
    try {
      const res = await fetch('/api/courses');
      const data = await res.json();
      setCourses(data);
    } catch (error) {
      console.error('Error fetching courses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const deleteCourse = async (id) => {
    if (confirm('Are you sure you want to delete this course?')) {
      try {
        await fetch(`/api/courses/${id}`, { method: 'DELETE' });
        fetchCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const togglePublish = async (id, currentStatus) => {
    try {
      const course = courses.find(c => c.id === id);
      await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...course,
          features: course.features || [],
          curriculum: course.curriculum || [],
          requirements: course.requirements || [],
          isPublished: !currentStatus
        })
      });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const toggleFeatured = async (id, currentStatus) => {
    try {
      const course = courses.find(c => c.id === id);
      await fetch(`/api/courses/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...course,
          features: course.features || [],
          curriculum: course.curriculum || [],
          requirements: course.requirements || [],
          isFeatured: !currentStatus
        })
      });
      fetchCourses();
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  if (loading) {
    return <div className="p-6">Loading courses...</div>;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Courses Management</h1>
        <Link 
          href="/admin/courses/create" 
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Create New Course
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Course
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {courses.map((course) => (
              <tr key={course.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {course.image && (
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-12 h-12 rounded-lg mr-4 object-cover"
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{course.title}</div>
                      <div className="text-sm text-gray-500">{course.level} • {course.duration}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{course.category?.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    ${course.price}
                    {course.originalPrice && (
                      <span className="text-gray-500 line-through ml-2">${course.originalPrice}</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span 
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full cursor-pointer ${
                        course.isPublished 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}
                      onClick={() => togglePublish(course.id, course.isPublished)}
                    >
                      {course.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {course.isFeatured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
                        Featured
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <Link 
                    href={`/admin/courses/edit/${course.id}`} 
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    Edit
                  </Link>
                  <Link 
                    href={`/courses/${course.slug}`} 
                    target="_blank"
                    className="text-green-600 hover:text-green-900 mr-4"
                  >
                    View
                  </Link>
                  <button 
                    onClick={() => toggleFeatured(course.id, course.isFeatured)}
                    className="text-yellow-600 hover:text-yellow-900 mr-4"
                  >
                    {course.isFeatured ? 'Unfeature' : 'Feature'}
                  </button>
                  <button 
                    onClick={() => deleteCourse(course.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {courses.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No courses created yet.</p>
        </div>
      )}
    </div>
  );
}
